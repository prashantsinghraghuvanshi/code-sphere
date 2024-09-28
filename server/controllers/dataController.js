const dataModel = require("../models/dataModel");

const userByIdController = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId not found" });
    }

    const data = await dataModel.userByIdModel(userId);

    if (!data.success) {
      return res
        .status(500)
        .json({ success: data.success, error: data.errorMessage });
    }

    return res.status(200).json({
      success: data.success,
      message: data.message,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getQueriesController = async (req, res) => {
  try {
    const data = await dataModel.getQueries();
    if (!data.success) {
      return res
        .status(500)
        .json({ success: data.success, error: data.message });
    }

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.queries,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "internal server error" });
  }
};

const getUserStatsController = async (req, res) => {
  try {
    // was facing issue here :
    // instead of req.body, req.query will be used here
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "no user data provided" });
    }

    const data = await dataModel.getStats(userId);
    if (!data.success) {
      return res
        .status(500)
        .json({ success: data.success, error: data.message });
    }

    return res.status(200).json({
      success: data.success,
      message: data.message,
      queries_posted: data.stats[0].queries_posted,
      queries_solved: data.stats[0].queries_solved,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "internal server error" });
  }
};

const getSolutionsController = async (req, res) => {
  try {
    const { query_id } = req.query;
    if (!query_id) {
      return res.status(400).json({ error: "no query id provided" });
    }

    const data = await dataModel.getSolutionModel(query_id);

    if (!data.success) {
      return res
        .status(500)
        .json({ success: data.success, error: data.message });
    }

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "internal server error" });
  }
};

const getQueriesByIdController = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "no user id provided" });
    }

    const data = await dataModel.getQueriesById(userId);

    if (!data.success) {
      return res.status(400).json({ error: "invalid data type" });
    }

    return res.status(200).json({
      success: data.success,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "internal server error" });
  }
};

module.exports = {
  userByIdController,
  getQueriesController,
  getUserStatsController,
  getSolutionsController,
  getQueriesByIdController,
};
