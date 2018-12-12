<template lang="html">
  <div class="image-upload">
    <label class="image-upload-file-select">
      <div class="el-button image-upload-btn">
        <span v-if="loadingFile === true">{{$t('loading')}} <i class="el-icon-loading"></i></span>
        <span v-else>{{$t('chooseFile')}} <i class="fa fa-cloud-upload"></i></span>
      </div>
      <div class="image-upload-file-text">
        <span class="image-upload-file-name" v-if="fileName">{{ fileName }}</span>
        <span class="image-upload-file-name" v-else></span>
         <span class="image-upload-file-validated">
          <i v-if="uploadValidated" class="fa fa-check-circle green"></i>
          <i v-else-if="loadingFile" class="fa fa-file-image-o blue-grey"></i>
          <i v-else></i>
        </span>
      </div>
      <input type="file"
        v-on:change="upload($event.target.files)"
        accept="image/*" />
    </label>
    <div v-if="preview" class="image-upload-avatar-preview">
      <img v-if="avatarPreview" :src="avatarPreview">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ImageUpload',
  props: ['preview'],
  data() {
    return {
      fileName: null,
      loadingFile: false,
      uploadValidated: false,
      avatarPreview: null
    }
  },
  computed: {
    clUrl() {
      return `https://api.cloudinary.com/v1_1/${
        process.env.VUE_APP_CL_CLOUD_NAME
      }/upload`
    }
  },
  methods: {
    upload(file) {
      this.uploadValidated = false
      this.loadingFile = true
      this.$emit('photoIsLoading', true)
      if (file[0].name) {
        this.fileName = file[0].name
        const formData = new FormData()
        formData.append('file', file[0])
        formData.append('upload_preset', process.env.VUE_APP_CL_UPLOAD_PRESET)
        formData.append('tags', 'gs-vue,gs-vue-uploaded')
        axios.post(this.clUrl, formData).then(res => {
          this.$emit('photoUploaded', res.data.secure_url)
          this.$emit('photoIsLoading', false)
          this.loadingFile = false
          this.uploadValidated = true
          this.avatarPreview = res.data.secure_url
        })
      }
    }
  }
}
</script>

<style lang="scss">
.image-upload {
  margin-top: 10px;
  position: relative;
  @include flex-start();
  label {
    margin-bottom: 5px;
  }
}
.image-upload-file-select > input[type='file'] {
  display: none;
}
.image-upload-btn {
  background-image: linear-gradient(
    to bottom,
    HSL(200, 100%, 69%),
    HSL(213, 77%, 52%)
  ) !important;
  padding: 8px 12px !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  border-radius: 2px !important;
  color: white !important;
  border: none !important;
  transition: all ease 0.3s !important;
  float: left !important;
  margin-bottom: 5px !important;
  i {
    margin-left: 5px;
  }
}
.image-upload-file-text {
  @include flex-start();
  width: 100%;
  margin: 10px 0;
  .image-upload-file-name {
    height: 20px;
    overflow: hidden;
    font-size: 13px;
    font-weight: 500;
    margin-left: 20px;
    color: $text-grey-blue;
    position: relative;
  }
  .image-upload-file-validated {
    position: absolute;
    left: 0;
    i {
      font-size: 15px;
    }
    i.fa-file-image-o {
      font-size: 13px;
    }
  }
}
.image-upload-avatar-preview {
  @include avatar-l();
  position: absolute;
  left: 65%;
  top: -25px;
}
</style>
