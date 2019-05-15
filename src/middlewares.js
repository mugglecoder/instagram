export const isAuthenticated = request => {
  if (!request.user) {
    throw Error("유저가 없습니다");
  }
  return;
};
