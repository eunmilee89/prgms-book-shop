const express = require('express');
const router = express.Router();

router.use(express.json());

// 장바구니 추가
router.post('/', (req, res) => {
  res.json('장바구니 추가');
});

// 장바구니 조회
router.get('/', (req, res) => {
  res.json('장바구니 조회');
});

// 장바구니 삭제
router.delete('/:id', (req, res) => {
  res.json('장바구니 삭제');
});

// 주문 예상 상품 목록 조회
// router.get('/', (req, res) => {
//   res.json('주문 예상 상품 목록 조회');
// });

module.exports = router;
