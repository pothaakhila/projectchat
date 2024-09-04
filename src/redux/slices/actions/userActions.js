// src/redux/actions/userActions.js
export const logoutUser = () => (dispatch) => {
    // Clear user data in Redux state
    dispatch({ type: 'LOGOUT_USER' });
  
    // Optionally, clear user data from localStorage or sessionStorage
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };
  // src/redux/actions/conversationActions.js
export const clearConversations = () => (dispatch) => {
    dispatch({ type: 'CLEAR_CONVERSATIONS' });
  };
  