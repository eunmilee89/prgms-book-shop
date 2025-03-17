const express = require('express');
const {
  addToCart,
  getCartItems,
  removeCartItems,
} = require('../controller/CartController');
const router = express.Router();

router.use(express.json());

router.post('/', addToCart); // 장바구니 추가
router.get('/', getCartItems); // 장바구니 조회, 주문서 조회
router.delete('/:id', removeCartItems); // 장바구니 삭제

module.exports = router;
