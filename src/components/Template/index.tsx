import { Component, Prop, Vue } from 'vue-property-decorator';
import style from './index.less';
@Component
export default class Template extends Vue {
    protected render() {
        return <div>Template</div>;
    }
}
