import Request from '../models/Request.js';
import User from '../models/User.js';

// Send request
export const sendRequest = async (req, res) => {
  try {
    const { receiverId, skillRequested, message } = req.body;

    if (!receiverId || !skillRequested) {
      return res.status(400).json({ success: false, message: 'Please provide receiver ID and skill' });
    }

    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ success: false, message: 'Receiver not found' });
    }

    // Check if request already exists
    const existingRequest = await Request.findOne({
      sender: req.user._id,
      receiver: receiverId,
      status: 'pending',
    });

    if (existingRequest) {
      return res.status(400).json({ success: false, message: 'Request already sent' });
    }

    const newRequest = new Request({
      sender: req.user._id,
      receiver: receiverId,
      skillRequested,
      message: message || '',
    });

    await newRequest.save();

    // Add to receiver's requests
    receiver.requests.push(newRequest._id);
    await receiver.save();

    res.status(201).json({
      success: true,
      message: 'Request sent successfully',
      data: newRequest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all requests for current user
export const getRequests = async (req, res) => {
  try {
    const { status = 'pending' } = req.query;

    let query = { receiver: req.user._id };

    if (status) {
      query.status = status;
    }

    const requests = await Request.find(query).populate('sender', 'name email profilePicture skills').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: requests,
      count: requests.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get sent requests
export const getSentRequests = async (req, res) => {
  try {
    const requests = await Request.find({ sender: req.user._id }).populate('receiver', 'name email profilePicture').sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: requests,
      count: requests.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Accept request
export const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId).populate('sender receiver');

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (request.receiver._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    request.status = 'accepted';
    await request.save();

    // Add connection
    if (!request.receiver.connections.includes(request.sender._id)) {
      request.receiver.connections.push(request.sender._id);
      await request.receiver.save();
    }

    if (!request.sender.connections.includes(request.receiver._id)) {
      request.sender.connections.push(request.receiver._id);
      await request.sender.save();
    }

    res.status(200).json({
      success: true,
      message: 'Request accepted successfully',
      data: request,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reject request
export const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    request.status = 'rejected';
    await request.save();

    res.status(200).json({
      success: true,
      message: 'Request rejected successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete request
export const deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (request.sender.toString() !== req.user._id.toString() && request.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await Request.findByIdAndDelete(requestId);

    res.status(200).json({
      success: true,
      message: 'Request deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
