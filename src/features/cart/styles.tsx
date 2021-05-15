import styled from "styled-components";

export const WholeContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const CartWrapper = styled.section`
  position: relative;
`;

export const CartUpperSection = styled.section`
  display: block;
  width: 640px;
  height: 54px;
  margin: 0 auto;
`;

export const TotalItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 640px;
  height: 55px;
  margin: 0 auto;
  padding: 0 20px;
  top: 135px;
  line-height: 1.5;
`;

export const RemoveItems = styled.div`
  color: #666666;
  button {
    position: relative;
    top: 2px;
    width: 19px;
    margin-left: 10px;
    filter: invert(30%);
    cursor: pointer;
  }
`;

export const CartLowerSection = styled.section`
  display: block;
  width: 640px;
  margin: 0 auto;
`;

export const AddedItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 640px;
  margin: 0 auto;
  border-top: 10px solid rgb(247, 247, 247);
`;

export const Item = styled.div`
  display: flex;
  width: 640px;
  padding: 20px 0;
  margin: 0px 16px 0px 20px;
  border-bottom: 1px solid rgb(240, 240, 240);
`;

export const ImageBox = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-right: 14px;
  background-color: black;
  img {
    width: 100px;
    height: 100px;
  }
`;

export const ItemInfo = styled.div`
  display: inline-block;
  width: 191px;
  padding-top: 6px;

  div {
    display: flex;
    justify-content: space-between;
    width: 460px;
    padding-bottom: 6.5px;
    font-size: 16px;
    line-height: 18.5px;

    button {
      right: 8px;
      background-color: white;
      border: 0;
      outline: none;
      cursor: pointer;
      img {
        width: 12px;
        height: 12px;
        filter: invert(80%);
      }
    }
  }
`;

export const Price = styled.div`
  padding-bottom: 10px;
`;

export const Quantity = styled.select`
  width: 191px;
  height: 34px;
  padding: 5px 10px 5px 5px;
  margin-top: 10px;
  border-color: rgb(227, 229, 232);
  border-radius: 4px;
  outline: none;
`;

export const Payment = styled.div`
  display: block;
  width: 640px;
  padding: 40px 20px 123px;
  margin: 0 auto;
`;

export const Shipping = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin-bottom: 23px;

  select {
    width: 200px;
    height: 33px;
    padding: 5px;
    border-color: rgb(227, 229, 232);
    border-radius: 4px;
  }
`;

export const Order = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  font-size: 16px;
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  height: 45px;
  font-weight: bolder;
`;

export const TotalPrice = styled.div`
  font-size: 26px;
  font-weight: bold;
`;

export const GoToPay = styled.button`
  display: block;
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 640px;
  height: 80px;
  background-color: rgba(251, 46, 69, 0.95);
  border: 0;
  outline: none;
  cursor: pointer;

  span {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: white;
  }
`;
