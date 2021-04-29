import { Component, Vue } from "vue-property-decorator";
import style from "./index.less";
@Component
export default class NotFound extends Vue {
	protected render() {
		return <div class={style.notFound}>NotFound</div>;
	}
}
