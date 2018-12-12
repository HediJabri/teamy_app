<template>
  <div class="button-fb-auth">
    <a
      :href="`${url}`"
      class="btn-facebook"
    >
      <i class="fa fa-facebook-official"></i>
      {{ text }} <span>{{$t('with')}}</span> Facebook
      <i
        v-if="loading"
        class="el-icon-loading"
      ></i>
    </a>
    <p
      v-if="loading"
      class="loading"
    >
      {{$t('login')}} {{$t('inProgress')}}...
    </p>
  </div>
</template>
<script>
window.fbAsyncInit = function() {
  // eslint-disable-next-line no-undef
  FB.init({
    appId: process.env.VUE_APP_FB_APP_ID,
    cookie: true,
    xfbml: true,
    version: 'v3.0'
  })
  // eslint-disable-next-line no-undef
  FB.AppEvents.logPageView()
}
;(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {
    return
  }
  js = d.createElement(s)
  js.id = id
  js.src = 'https://connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
})(document, 'script', 'facebook-jssdk')

export default {
  name: 'ButtonAuthFb',
  props: ['text'],
  data() {
    return {
      loading: false,
      url: `https://www.facebook.com/v3.0/dialog/oauth?client_id=${
        process.env.VUE_APP_FB_APP_ID
      }&redirect_uri=${
        process.env.VUE_APP_BASE_APP_URI
      }login&state="{st=state123abc,ds=123456789}"&response_type=token&scope=email`
    }
  },
  methods: {
    loginFb() {
      // eslint-disable-next-line no-undef
      FB.getLoginStatus(this.checkLoginState)
    },
    openFbLoginDialog() {
      // eslint-disable-next-line no-undef
      FB.login(this.checkLoginState, { scope: 'email' })
    },
    checkLoginState(response) {
      if (response.status === 'connected') {
        const token = response.authResponse.accessToken
        this.$emit('AuthWithFb', token)
      } else {
        const url = `https://www.facebook.com/v3.0/dialog/oauth?client_id=${
          process.env.VUE_APP_FB_APP_ID
        }&redirect_uri=${
          process.env.VUE_APP_BASE_APP_URI
        }login&state="{st=state123abc,ds=123456789}"&response_type=token&scope=email`
        window.location.href = url
      }
    }
  },
  created() {
    const fullPath = this.$route.fullPath
    // Check if facebook token in url
    // Todo => includes state value in .env vars
    if (fullPath.includes('#state=')) {
      this.loading = true
      const token = fullPath.substring(
        fullPath.lastIndexOf('access_token=') + 13,
        fullPath.lastIndexOf('&expires_in=')
      )
      this.$emit('AuthWithFb', token)
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-facebook {
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.6px;
  background: #466aae;
  border: 1px solid #466aae;
  color: white;
  padding: 7px 25px;
  text-decoration: none;
  border-radius: 2px;
  text-align: center;
  i {
    margin-right: 4px;
  }
  &:hover,
  &:focus {
    background: #466aae;
    border: 1px solid #466aae;
    opacity: 0.8;
  }
}

.loading {
  text-align: center;
  margin-top: 10px;
}

@media only screen and (max-width: 480px) {
  .btn-facebook {
    margin-right: 2px;
    font-size: 12px;
    padding: 7px 10px;
    span {
      display: none;
    }
  }
}
</style>
