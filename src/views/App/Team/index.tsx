import { Component, Vue } from 'vue-property-decorator';
import style from './index.less';
@Component
export default class Team extends Vue {
  protected render() {
    return <router-view></router-view>;
  }
}
