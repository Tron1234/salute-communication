<script>
  import * as types from 'store/mutations-types'
  export default {
    onLaunch() {
      this.$store.commit(types.CHANGEMAINCOLOR);
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  @import url('static/scss/orange.css');
  @import url('static/scss/blue.css');
  @import url('static/scss/green.css');
  @import url('static/scss/pink.css');

  :root {
    color: #505050;
  }

  .relative {
    position: relative;
    width: 100%;
  }

  .absoulte {
    position: absolute;
  }

  .fixed {
    position: fixed;
  }

  //flex布局全部居中
  .flexCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  //flex布局水平居中
  .flexHorCenter {
    display: flex;
    justify-content: center;
  }

  //flex布局垂直居中
  .flexVerCenter {
    display: flex;
    align-items: center;
  }
	.flexRow{
		display: flex;
		flex-direction: row;
	}
	.flexColum{
		display: flex;
		flex-direction: column;
	}

  .imgWidth {
    width: 500rpx;
    height: 500rpx;
  }

  .inputBox {
    margin-bottom: 30rpx;
  }
</style>
