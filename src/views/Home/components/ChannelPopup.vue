<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button round class="edit-btn" @click="isEdit = !isEdit">
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>

    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannel"
        :key="item.id"
        :text="item.name"
        class="myChannel-item"
        :class="{ active: item.name === '推荐' }"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>

    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannel"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="recommend-item"
        @click="$emit('add-channel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel as getAllChannelApi } from '@/api'
export default {
  data() {
    return {
      isEdit: false,
      AllChannel: []
    }
  },
  props: {
    myChannel: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.getAllChannel()
  },
  computed: {
    recommendChannel() {
      return this.AllChannel.filter((aitem) => {
        return !this.myChannel.find((mitem) => aitem.id === mitem.id)
      })
    }
  },
  methods: {
    async getAllChannel() {
      const { data } = await getAllChannelApi()
      console.log(data)
      this.AllChannel = data.data.channels
    },
    changeActive(index, item) {
      if (this.isEdit) {
        // 删除
        if (item.name === '推荐') return

        this.$emit('del-channel', item.id)
      } else {
        console.log(this)
        this.$parent.$parent.show = false
        this.$emit('change', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.33333rem;
  font-size: 0.4267rem;
  .van-cell {
    align-items: center;
    .van-cell__value {
      line-height: 0;
    }
  }
  .edit-btn {
    width: 1.38667rem;
    height: 0.64rem;
    border-color: red;
    color: red;
    &.van-button--normal {
      padding: 0 0.21333rem;
      font-size: 0.32rem;
    }
  }
  :deep(.van-grid) {
    padding-left: 0.1rem !important;
  }
  :deep(.van-grid-item__content) {
    background-color: #f4f5f6;
  }
  :deep(.van-grid-item) {
    height: 1.1733rem;
    padding-right: 0.1rem !important;
  }
  .recommend-item {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      .van-icon-plus {
        font-size: 0.48rem;
      }
      .van-grid-item__icon + .van-grid-item__text {
        margin-top: 0.08rem;
      }
    }
  }
  :deep(.myChannel-item) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(25%, -40%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
    .van-grid-item__icon + .van-grid-item__text {
      margin: 0;
    }
  }
}
</style>
