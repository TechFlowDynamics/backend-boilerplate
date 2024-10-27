export const loginAgg = (value: string) => {
  return [
    {
      $match: {
        $or: [{ phoneNumber: value }, { username: value }],
      },
    },
    {
      $project: {
        _id: 0,
        userName: 1,
        phoneNumber: 1,
        email: 1,
        password: 1,
        active: 1,
      },
    },
  ];
};
