import { Action, ActionwithMultipart } from "../config/action";
import https from "https";
import { useRouter } from "next/navigation";

export const getFeedbacks = async (page) => {
  const response = await Action.get(`admin/helpAndFeedBack?page=${page}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });

  return response.data;
};

export const getBehaviour = async () => {
  const response = await Action.get(`getAllBehavior`, {});

  return response.data;
};

export const getUsers = async (page = 1) => {
  const response = await Action.get(`admin/profile?page=${page}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });

  return response.data;
};

export const getSynopsis = async (page) => {
  const response = await Action.get(`admin/getAllSynopsis?page=${page}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  });

  return response.data;
};

export const deleteBehaviour = async (_id) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const response = await Action.delete(`admin/deleteBehavior/${_id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting behavior:", error.message);
    throw error;
  }
};

export const addBehavior = async (title, image) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));

    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    const response = await Action.post("admin/addBehavior", formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding behavior:", error.message);
    throw error;
  }
};

export const editBehavior = async (behaviorId, title, imageFile) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const formData = new FormData();
    formData.append("title", title);

    const response = await Action.put(`admin/editBehavior/${behaviorId}`, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // You can return the updated behavior data if needed
  } catch (error) {
    throw error;
  }
};

export const addQuestion = async (behaviorId, question, questionType) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const response = await Action.post(
      `admin/addQuestion`,
      {
        behavior: behaviorId,
        question,
        questionType,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding question:", error.message);
    throw error;
  }
};

export const replyToCustomer = async (to, subject, content) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const response = await Action.post(
      "admin/replyToCustomer",
      {
        to,
        subject,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};

export const updateQuestions = async (behaviorId, questionsArray) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("token"));
    const response = await Action.put(
      `admin/questionsUpdate/${behaviorId}`,
      { questionsArray },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const adminLogin = async (payload) => {
  const response = await Action.post("admin/login", payload);
  return response.data;
};

export const emptyLocalStorageOnLogout = async (navigate) => {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
