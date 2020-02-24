// authentication
export const getAuthLoading = state => state.auth.loading;
export const getAuthError = state => state.auth.error;

// account
export const getCurrentUser = state => state.account.account;
export const getUserId = state => (state.account.account ? state.account.account.id : null);
export const getLogStatus = state => state.account.logged;

// home screen

/* recentMatches: [],
topLeaders: [],
recentNews: [],
topClubs: [], */
export const getTopLeaders = state => state.home.topLeaders;
export const getTopClubs = state => state.home.topClubs;
export const getRecentMatches = state => state.home.recentMatches;

// player
export const getPlayer = state => state.player.player;
