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

export const SelectedItem = styled.div`
  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + label {
    color: rgb(51, 51, 51);
    font-size: 16px;
  }

  input[type="checkbox"] + label span {
    display: inline-block;
    width: 22px;
    height: 22px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    vertical-align: middle;
    margin: -2px 10px 0 0;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDc3Ljg2NyA0NzcuODY3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzcuODY3IDQ3Ny44Njc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjM4LjkzMywwQzEwNi45NzQsMCwwLDEwNi45NzQsMCwyMzguOTMzczEwNi45NzQsMjM4LjkzMywyMzguOTMzLDIzOC45MzNzMjM4LjkzMy0xMDYuOTc0LDIzOC45MzMtMjM4LjkzMw0KCQkJQzQ3Ny43MjYsMTA3LjAzMywzNzAuODM0LDAuMTQxLDIzOC45MzMsMHogTTM3MC40NjYsMTY1LjY2NkwxOTkuNzk5LDMzNi4zMzNjLTYuNjY1LDYuNjYzLTE3LjQ2OCw2LjY2My0yNC4xMzIsMGwtNjguMjY3LTY4LjI2Nw0KCQkJYy02Ljc4LTYuNTQ4LTYuOTY4LTE3LjM1Mi0wLjQyLTI0LjEzMmM2LjU0OC02Ljc4LDE3LjM1Mi02Ljk2OCwyNC4xMzItMC40MmMwLjE0MiwwLjEzOCwwLjI4MiwwLjI3NywwLjQyLDAuNDJsNTYuMjAxLDU2LjIwMQ0KCQkJbDE1OC42MDEtMTU4LjYwMWM2Ljc4LTYuNTQ4LDE3LjU4NC02LjM2LDI0LjEzMiwwLjQxOUMzNzYuODU0LDE0OC41NjcsMzc2Ljg1NCwxNTkuMDUyLDM3MC40NjYsMTY1LjY2NnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==);
    background-repeat: no-repeat;
    filter: invert(80%);
    cursor: pointer;
  }

  input[type="checkbox"]:checked + label span {
    width: 22px;
    height: 22px;
    border-radius: 100%;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDc3Ljg2NyA0NzcuODY3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzcuODY3IDQ3Ny44Njc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjM4LjkzMywwQzEwNi45NzQsMCwwLDEwNi45NzQsMCwyMzguOTMzczEwNi45NzQsMjM4LjkzMywyMzguOTMzLDIzOC45MzNzMjM4LjkzMy0xMDYuOTc0LDIzOC45MzMtMjM4LjkzMw0KCQkJQzQ3Ny43MjYsMTA3LjAzMywzNzAuODM0LDAuMTQxLDIzOC45MzMsMHogTTM3MC40NjYsMTY1LjY2NkwxOTkuNzk5LDMzNi4zMzNjLTYuNjY1LDYuNjYzLTE3LjQ2OCw2LjY2My0yNC4xMzIsMGwtNjguMjY3LTY4LjI2Nw0KCQkJYy02Ljc4LTYuNTQ4LTYuOTY4LTE3LjM1Mi0wLjQyLTI0LjEzMmM2LjU0OC02Ljc4LDE3LjM1Mi02Ljk2OCwyNC4xMzItMC40MmMwLjE0MiwwLjEzOCwwLjI4MiwwLjI3NywwLjQyLDAuNDJsNTYuMjAxLDU2LjIwMQ0KCQkJbDE1OC42MDEtMTU4LjYwMWM2Ljc4LTYuNTQ4LDE3LjU4NC02LjM2LDI0LjEzMiwwLjQxOUMzNzYuODU0LDE0OC41NjcsMzc2Ljg1NCwxNTkuMDUyLDM3MC40NjYsMTY1LjY2NnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==);
    filter: invert(20%);
  }
  span {
    margin-left: 5px;
    font-weight: bold;
  }
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

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + label {
    color: rgb(51, 51, 51);
    font-size: 16px;
  }

  input[type="checkbox"] + label span {
    display: inline-block;
    width: 22px;
    height: 22px;
    border: $greyBorder;
    vertical-align: middle;
    margin: -2px 10px 0 0;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDc3Ljg2NyA0NzcuODY3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzcuODY3IDQ3Ny44Njc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjM4LjkzMywwQzEwNi45NzQsMCwwLDEwNi45NzQsMCwyMzguOTMzczEwNi45NzQsMjM4LjkzMywyMzguOTMzLDIzOC45MzNzMjM4LjkzMy0xMDYuOTc0LDIzOC45MzMtMjM4LjkzMw0KCQkJQzQ3Ny43MjYsMTA3LjAzMywzNzAuODM0LDAuMTQxLDIzOC45MzMsMHogTTM3MC40NjYsMTY1LjY2NkwxOTkuNzk5LDMzNi4zMzNjLTYuNjY1LDYuNjYzLTE3LjQ2OCw2LjY2My0yNC4xMzIsMGwtNjguMjY3LTY4LjI2Nw0KCQkJYy02Ljc4LTYuNTQ4LTYuOTY4LTE3LjM1Mi0wLjQyLTI0LjEzMmM2LjU0OC02Ljc4LDE3LjM1Mi02Ljk2OCwyNC4xMzItMC40MmMwLjE0MiwwLjEzOCwwLjI4MiwwLjI3NywwLjQyLDAuNDJsNTYuMjAxLDU2LjIwMQ0KCQkJbDE1OC42MDEtMTU4LjYwMWM2Ljc4LTYuNTQ4LDE3LjU4NC02LjM2LDI0LjEzMiwwLjQxOUMzNzYuODU0LDE0OC41NjcsMzc2Ljg1NCwxNTkuMDUyLDM3MC40NjYsMTY1LjY2NnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==);
    background-repeat: no-repeat;
    filter: invert(80%);
    cursor: pointer;
  }

  input[type="checkbox"]:checked + label span {
    width: 22px;
    height: 22px;
    border-radius: 100%;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDc3Ljg2NyA0NzcuODY3IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NzcuODY3IDQ3Ny44Njc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMjM4LjkzMywwQzEwNi45NzQsMCwwLDEwNi45NzQsMCwyMzguOTMzczEwNi45NzQsMjM4LjkzMywyMzguOTMzLDIzOC45MzNzMjM4LjkzMy0xMDYuOTc0LDIzOC45MzMtMjM4LjkzMw0KCQkJQzQ3Ny43MjYsMTA3LjAzMywzNzAuODM0LDAuMTQxLDIzOC45MzMsMHogTTM3MC40NjYsMTY1LjY2NkwxOTkuNzk5LDMzNi4zMzNjLTYuNjY1LDYuNjYzLTE3LjQ2OCw2LjY2My0yNC4xMzIsMGwtNjguMjY3LTY4LjI2Nw0KCQkJYy02Ljc4LTYuNTQ4LTYuOTY4LTE3LjM1Mi0wLjQyLTI0LjEzMmM2LjU0OC02Ljc4LDE3LjM1Mi02Ljk2OCwyNC4xMzItMC40MmMwLjE0MiwwLjEzOCwwLjI4MiwwLjI3NywwLjQyLDAuNDJsNTYuMjAxLDU2LjIwMQ0KCQkJbDE1OC42MDEtMTU4LjYwMWM2Ljc4LTYuNTQ4LDE3LjU4NC02LjM2LDI0LjEzMiwwLjQxOUMzNzYuODU0LDE0OC41NjcsMzc2Ljg1NCwxNTkuMDUyLDM3MC40NjYsMTY1LjY2NnoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==);
    filter: invert(20%);
  }
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
