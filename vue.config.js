const IS_PRODUCTION = process.env.NODE_ENV === "production";
module.exports = {
	publicPath: "/",
	pluginOptions: {
		electronBuilder: {
			outputDir: "dist_electron", // 输出目录
			builderOptions: {
				publish: [
					{
						provider: "github",
						owner: "BWrong",
						repo: "misthinTools",
						releaseType: "draft",
					},

					// {
					// provider: 'generic', // 自己托管服务器
					// url: 'http://10.6.30.238:8888/software/course-tools/'
					// }
				],
				snap: {
					publish: ["github"],
				},
				win: {
					icon: "./build/icons/icon.ico", // 应用文件图标
					target: [{ target: "nsis", arch: ["x64"] }],
					legalTrademarks: "misthin",
				},
				mac: {
					icon: "./build/icons/icon.icns",
					category: "public.app-category.developer-tools", // 应用类别
					target: [{ target: "dmg" }],
					darkModeSupport: true, // 深色模式支持
					extendInfo: {
						// LSUIElement: 1 // 不占用dock栏
					},
				},
				nsis: {
					oneClick: false, // 一键安装
					perMachine: false, // 辅助安装模式
					allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
					allowToChangeInstallationDirectory: true, // 允许修改安装目录
					createDesktopShortcut: true, // 创建桌面图标
					createStartMenuShortcut: true, // 创建开始菜单图标
				},
				dmg: {
					// contents: [
					//   {
					//     x: 410,
					//     y: 150,
					//     type: 'link',
					//     path: '/Applications'
					//   },
					//   {
					//     x: 130,
					//     y: 150,
					//     type: 'file'
					//   }
					// ]
				},
				linux: {
					icon: "build/electron-icon/icon.png",
					target: "AppImage",
				},
				productName: "ViewDesign", // 安装文件名
				appId: "org.misthin-tools.electron",
				// appId: 'org.${name}.electron',
				copyright: "Copyright © 2021 ${author}", //版权信息
				asar: true,
				// files: ['/**/*'],
				// extraFiles: ['./extensions/'],
			},
			mainProcessFile: "src/main/index.ts",
			mainProcessWatch: ["src/main/**/*"],
			nodeIntegration: true,
			// mainProcessArgs: [],
			// rendererProcessFile: 'src/main.js',
			// chainWebpackMainProcess: (config) => {}, //主进程配置
			// chainWebpackRendererProcess: (config) => {}, // 渲染进程配置
			// disableMainProcessTypescript: false, // 主进程禁用ts
			// mainProcessTypeChecking: false, // 主进程禁用类型检查
			// removeElectronJunk: false
		},
	},
	productionSourceMap: false,
	css: {
		extract: IS_PRODUCTION,
		sourceMap: !IS_PRODUCTION,
		loaderOptions: {
			less: {
				javascriptEnabled: true,
				modifyVars: {},
			},
		},
	},
	chainWebpack: (config) => {
		config.plugin("html").tap((args) => {
			args[0].title = "view-design";
			return args;
		});
		config.module
			.rule("less")
			.oneOf("normal")
			.test(/src.+\.less/)
			.use("css-loader")
			.tap((args) => {
				return {
					...args,
					localIdentName: "[path]-[local]-[hash:base64:5]",
					modules: true,
				};
			});
		// 处理node_modules下的less文件
		config.module
			.rule("less")
			.oneOf("lib-less")
			.test(/node_modules.+\.less/)
			.use("style-loader")
			.loader("style-loader");
		config.module
			.rule("less")
			.oneOf("lib-less")
			.use("css-loader")
			.loader("css-loader");

		config.module
			.rule("less")
			.oneOf("lib-less")
			.use("less-loader")
			.loader("less-loader")
			.tap(() => ({
				javascriptEnabled: true,
			}));
		config.module
			.rule("javascript/auto")
			.test(/\.mjs$/)
			.include.add(/node_modules/)
			.end()
			.type("javascript/auto");
		config.when(process.env.NODE_ENV !== "development", (config) => {
			config.optimization.splitChunks({
				chunks: "all",
				cacheGroups: {
					vendor: {
						name: "chunk-vendor",
						test: /[\\/]node_modules[\\/]/,
						priority: 10, // 优先级
						chunks: "initial",
					},
					antd: {
						name: "chunk-antd",
						test: /[\\/]node_modules[\\/]_?(ant-design-vue|@ant-design)(.*)/,
						priority: 20,
					},
				},
			});
			config.optimization.runtimeChunk("single");
			// config.optimization.mergeDuplicateChunks=false;
		});
	},
};
