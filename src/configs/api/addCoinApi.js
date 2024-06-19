import apiClient from "./index";

export const addCoin = async ( userId, amount) => {
  console.log(userId)
  console.log(amount)
  try {
    const expireAt = new Date();
    expireAt.setMinutes(expireAt.getMinutes() + 5);
    const items = [
      {
        name: "Spirit",
        quantity: 1,
        price: 300000,
      },
    ];
    const addCoin = await apiClient.post(`/Payment/PayOS`, {
      userId: userId,
      amount: amount,
      description: "nạp coin",
      items: items,
      returnURL: "https://translate.google.com/?hl=vi&sl=en&tl=vi&op=translate",
      cancelURL: "youtube.com/",
      expireAt: expireAt.toISOString(),
    });
    return addCoin.data;
  } catch (error) {
    throw new Error(error.message); 
  }
};
