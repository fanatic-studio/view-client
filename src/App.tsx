import { Action, State } from 'vuex-class';
import { Component, Vue } from 'vue-property-decorator';
import { ConfigProvider } from 'ant-design-vue';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import zh_TW from 'ant-design-vue/lib/locale-provider/zh_TW';
import en_US from 'ant-design-vue/lib/locale-provider/en_US';
import './App.less';
interface lanMap {
    [propName: string]: object;
}
@Component
export default class App extends Vue {
    inputValue: string = '';
    @State((state) => state.language.current) currentLocale!: string;
    lanMap: lanMap = {
        'zh-CN': zh_CN,
        'zh-TW': zh_TW,
        'en-US': en_US
    };
    protected render() {
        return (
            <ConfigProvider locale={this.lanMap[this.currentLocale]}>
                <router-view></router-view>
            </ConfigProvider>
        );
    }
}
