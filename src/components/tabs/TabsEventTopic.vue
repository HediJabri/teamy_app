<template>
  <div class="tabs-topic" v-if="event">
    <div class="tabs-comments" v-if="event.topic">
      <div class="tabs-comments-header">
        <h5 v-if="event.topic.comments"> 
          {{$tc('Comment', event.topic.comments.length)}}
        </h5>
      </div>
      <div class="tabs-comments-list" 
        v-if="event.topic.comments && event.topic.comments.length">
        <div class="tabs-comments-list-item-wrapper"
          v-for="comment in event.topic.comments" :key="comment._id">
          <div class="tabs-comments-list-item">
            <div class="list-item-content">
              <div class="list-item-img avatar">
                <img v-if="comment.user.avatar" :src="comment.user.avatar">
                <img v-else src="../../assets/img/user.png">
              </div>
              <div class="list-item-body">
                <p class="list-item-body-top">
                  {{ comment.user.firstName }} {{ comment.user.lastName }}
                </p>
                <p class="list-item-body-bottom"></p>
              </div>
            </div>
          </div>
          <p class="list-item-content-bottom">
            {{ comment.content }}
            <el-tooltip v-if="comment.membersToNotify"
              :content="`${$tc('membersNotified', comment.membersToNotify)}`"
              placement="top" :open-delay="300">
              <i class="fa fa-envelope"></i>
            </el-tooltip> 
          </p>
        </div>
      </div>
      <div class="tabs-comments-form">
        <el-input type="textarea" :rows="3" v-model="newComment" 
          :placeholder="$t('writeYourMessageHere')">
        </el-input>
        <div class="tabs-comments-buttons">
          <div class="tabs-comments-btn">
            <button-notify-users>
              <el-button type="default" :disabled="!newComment.length">
                {{$t('notify')}}
                <i class="fa fa-envelope margin-left" :class="{'blue': newComment.length}"></i>
              </el-button>
            </button-notify-users>
            <div v-if="membersToNotify.length" class="tabs-comments-tag">
              <span> {{$tc('member', membersToNotify.length)}}</span>
            </div>
          </div>
          <div class="tabs-comments-btn">
            <el-button type="primary" :disabled="!newComment.length" @click="postComment">
              {{$t('add')}}
              <i class="fa fa-plus-circle margin-left"></i>
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="tabs-comments-empty-item" v-else>
      <el-button type="primary" @click="createTopic()" :loading="isTopicLoading">
        {{$t('addComment')}} <i class="material-icons">forum</i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiComments from '@/services/ApiComments'
import ApiTopics from '@/services/ApiTopics'
import ButtonNotifyUsers from '@/components/buttons/users/ButtonNotifyUsers'

export default {
  name: 'TabsEventComments',
  mixins: [utilities],
  components: { ButtonNotifyUsers },
  data() {
    return {
      membersToNotify: [],
      dialogNotifyMembers: false,
      isTopicLoading: false,
      newComment: ''
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'event'])
  },
  methods: {
    ...mapActions(['addEventTopic', 'addEventTopicComment']),
    initMembersToNotify(members) {
      this.membersToNotify = members
    },
    async createTopic() {
      try {
        this.isTopicLoading = true
        const body = {
          name: this.event.name,
          user: this.currentUser._id,
          event: this.event._id
        }
        const topic = (await ApiTopics.post(body)).data.topic
        this.addEventTopic(topic)
        this.isTopicLoading = false
      } catch (err) {
        this.impossibleActionNotify(err)
        this.isTopicLoading = false
      }
    },
    async postComment() {
      try {
        const body = {
          content: this.newComment,
          user: this.currentUser._id,
          topic: this.event.topic._id,
          team: this.event.team._id
        }
        if (this.membersToNotify.length)
          body.membersToNotify = this.membersToNotify
        const comment = (await ApiComments.post(body)).data.comment
        this.addEventTopicComment(comment)
        this.newComment = ''
        this.membersToNotify = []
      } catch (err) {
        this.impossibleActionNotify(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-comments {
  padding: 0 50px;
}
.tabs-comments-empty-item {
  @include flex-center;
  height: 100px;
  .el-button {
    padding: 9px 14px 12px 14px;
    @include flex-center;
    i {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
.tabs-comments-header {
  @include page-title;
}
.tabs-comments-list {
  padding: 20px 0;
}
.tabs-comments-list-item-wrapper {
  margin-bottom: 10px;
}
.tabs-comments-list-item {
  @include list-item-s;
  background: transparent;
  cursor: default;
  &:hover {
    background: transparent;
  }
}
.list-item-content-bottom {
  padding-left: 60px;
  font-size: 13px;
  margin-top: -5px;
  i {
    color: $blue;
    cursor: pointer;
    margin-left: 5px;
  }
}
.tabs-comments-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  .tabs-comments-btn {
    margin-left: 5px;
  }
  .tabs-comments-tag {
    margin-top: 10px;
    span {
      @include flex-center;
      @include tag-flat-s;
      i {
        color: $blue;
        margin-left: 5px;
      }
    }
  }
}

@media only screen and (max-width: 479px) {
  .tabs-comments {
    padding: 0;
  }
  .tabs-comments-list-item {
    padding: 9px 0px;
  }
  .list-item-content-bottom {
    padding-left: 35px;
    font-size: 12px;
  }
  textarea {
    font-size: 13px;
  }
}
</style>
