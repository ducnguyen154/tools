<template>
  <b-container class="mt-5 mb-5">
    <b-card-group columns>
      <b-card title="Random" border-variant="info" align="center">
        <b-card-text
          >Chức năng hỗ trợ tạo chuỗi random, giúp ích trong việc tạo chuỗi
          random cho password hay các chuỗi random cần thiết khác</b-card-text
        >
        <b-link href="https://random.ducng.info" class="btn btn-info"
          >Truy cập</b-link
        >
      </b-card>
      <b-card title="Tính lương" border-variant="danger" align="center">
        <b-card-text
          >Chức năng hỗ trợ chuyển đổi lương GROSS - NET, giúp bạn nhanh chóng
          biết được chi tiết thông tin lương, bảo hiểm cũng như tiền thuế mà bạn
          phải đóng</b-card-text
        >
        <b-link href="https://tinhluong.ducng.info" class="btn btn-danger"
          >Truy cập</b-link
        >
      </b-card>
    </b-card-group>
  </b-container>
</template>

<style lang="scss" scoped>
::v-deep {
  .card-text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
}
</style>
