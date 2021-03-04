import { Component, Vue } from 'vue-property-decorator';
import style from './index.less';
@Component
export default class Project extends Vue {
    protected render() {
        return <div>Project</div>;
    }
}
