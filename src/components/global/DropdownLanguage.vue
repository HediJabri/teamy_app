<template>
  <div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i class="material-icons icon-lang">language</i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="language in languages"
          :key="language.flag"
        >
          <span class="dropdown-text">
            <flag
              :iso="language.flag"
              v-bind:squared=false
            />
            <span>{{ language.title }}</span>
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'DropdownLanguage',
  data() {
    return {
      languages: [
        { flag: 'gb', type: 'en', title: 'English' },
        { flag: 'fr', type: 'fr', title: 'French' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-lang {
  font-size: 22px;
  margin: 6px 10px;
}
.el-dropdown-menu {
  li {
    color: $blue-grey;
    &:hover,
    &:focus {
      color: $blue-grey;
      text-decoration: none;
    }
  }
  .flag-icon {
    width: 16px;
    margin-right: 5px;
  }
}
</style>
