import {
	App,
	Plugin,
	PluginSettingTab,
	Setting
} from 'obsidian';

import * as nomnoml from 'nomnoml';

interface NomnomlDiagramSettings {
	// nomnoml's directive options are prefixed with # for convenience
	'#arrowSize':  string;
	'#bendSize':   string;
	'#direction':  string;
	'#gutter':     string;
	'#edgeMargin': string;
	'#gravity':    string;
	'#edges':      string;
	'#background': string;
	'#fill':       string;
	'#fillArrows': boolean;
	'#font':       string;
	'#fontSize':   string;
	'#leading':    string;
	'#lineWidth':  string;
	'#padding':    string;
	'#spacing':    string;
	'#stroke':     string;
	'#ranker':     string;
}

const DEFAULT_SETTINGS: NomnomlDiagramSettings = {
	'#arrowSize':  '',
	'#bendSize':   '',
	'#direction':  'down',
	'#gutter':     '',
	'#edgeMargin': '',
	'#gravity':    '',
	'#edges':      'rounded',
	'#background': '#ffffff',
	'#fill':       '',
	'#fillArrows': false,
	'#font':       '',
	'#fontSize':   '',
	'#leading':    '',
	'#lineWidth':  '',
	'#padding':    '',
	'#spacing':    '',
	'#stroke':     '',
	'#ranker':     'network-simplex',
};

export default class NomnomlDiagram extends Plugin {

	settings: NomnomlDiagramSettings;

	async onload() {

		console.log('Loading nomnoml diagram plugin');

		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor('nomnoml', (source: string, el: HTMLElement, ctx: any) => {

			const toRender: string = [
				// Simply prepend all the global directive options,
				// since globally prepended directives can be overriden in nomnoml code blocks.
				...Object.entries(this.settings)
					.filter(([key, value]) => (
						key.startsWith('#') &&
						value !== undefined &&
						value !== null &&
						value !== ''
					))
					.map(([key, value]) => `${key}: ${value}`),
				// nomnoml code block's original source
				source
			].join('\n');
			
			try {
				el.innerHTML = [
					`<div class="nomnoml-diagram-container">`,
						nomnoml.renderSvg(toRender),
					`</div>`,
				].join('');
			} catch (err) {
				el.innerHTML = '';
			}

		});

		this.addSettingTab(new NomnomlDiagramSettingTab(this.app, this));

	}

	onunload() {
		console.log('Unloading nomnoml diagram plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class NomnomlDiagramSettingTab extends PluginSettingTab {

	plugin: NomnomlDiagram;

	constructor(app: App, plugin: NomnomlDiagram) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {

		let { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Arrow Size')
			.setDesc('#arrowSize directive')
			.addText(text => (
				text
					.setPlaceholder('1')
					.setValue(this.plugin.settings['#arrowSize'])
					.onChange(async (value) => {
						this.plugin.settings['#arrowSize'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Bend Size')
			.setDesc('#bendSize directive')
			.addText(text => (
				text
					.setPlaceholder('0.3')
					.setValue(this.plugin.settings['#bendSize'])
					.onChange(async (value) => {
						this.plugin.settings['#bendSize'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Direction')
			.setDesc('#direction directive')
			.addDropdown(dropdown => (
				dropdown
					.addOption('down', 'Down')
					.addOption('right', 'Right')
					.setValue(this.plugin.settings['#direction'])
					.onChange(async (value) => {
						this.plugin.settings['#direction'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Gutter')
			.setDesc('#gutter directive')
			.addText(text => (
				text
					.setPlaceholder('20')
					.setValue(this.plugin.settings['#gutter'])
					.onChange(async (value) => {
						this.plugin.settings['#gutter'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Edge Margin')
			.setDesc('#edgeMargin directive')
			.addText(text => (
				text
					.setPlaceholder('0')
					.setValue(this.plugin.settings['#edgeMargin'])
					.onChange(async (value) => {
						this.plugin.settings['#edgeMargin'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Gravity')
			.setDesc('#gravity directive')
			.addText(text => (
				text
					.setPlaceholder('1')
					.setValue(this.plugin.settings['#gravity'])
					.onChange(async (value) => {
						this.plugin.settings['#gravity'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Edges')
			.setDesc('#edges directive')
			.addDropdown(dropdown => (
				dropdown
					.addOption('rounded', 'Rounded')
					.addOption('hard', 'Hard')
					.setValue(this.plugin.settings['#edges'])
					.onChange(async (value) => {
						this.plugin.settings['#edges'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Background')
			.setDesc('#background directive')
			.addText(text => (
				text
					.setPlaceholder('#ffffff')
					.setValue(this.plugin.settings['#background'])
					.onChange(async (value) => {
						this.plugin.settings['#background'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Fill')
			.setDesc('#fill directive')
			.addText(text => (
				text
					.setPlaceholder('#eee8d5; #fdf6e3')
					.setValue(this.plugin.settings['#fill'])
					.onChange(async (value) => {
						this.plugin.settings['#fill'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Fill Arrows')
			.setDesc('#fillArrows directive')
			.addToggle(toggle => (
				toggle
					.setValue(this.plugin.settings['#fillArrows'])
					.onChange(async (value) => {
						this.plugin.settings['#fillArrows'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Font')
			.setDesc('#font directive')
			.addText(text => (
				text
					.setPlaceholder('')
					.setValue(this.plugin.settings['#font'])
					.onChange(async (value) => {
						this.plugin.settings['#font'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Font Size')
			.setDesc('#fontSize directive')
			.addText(text => (
				text
					.setPlaceholder('12')
					.setValue(this.plugin.settings['#fontSize'])
					.onChange(async (value) => {
						this.plugin.settings['#fontSize'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Leading')
			.setDesc('#leading directive')
			.addText(text => (
				text
					.setPlaceholder('1.25')
					.setValue(this.plugin.settings['#leading'])
					.onChange(async (value) => {
						this.plugin.settings['#leading'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Line Width')
			.setDesc('#lineWidth directive')
			.addText(text => (
				text
					.setPlaceholder('3')
					.setValue(this.plugin.settings['#lineWidth'])
					.onChange(async (value) => {
						this.plugin.settings['#lineWidth'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Padding')
			.setDesc('#padding directive')
			.addText(text => (
				text
					.setPlaceholder('8')
					.setValue(this.plugin.settings['#padding'])
					.onChange(async (value) => {
						this.plugin.settings['#padding'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Spacing')
			.setDesc('#spacing directive')
			.addText(text => (
				text
					.setPlaceholder('40')
					.setValue(this.plugin.settings['#spacing'])
					.onChange(async (value) => {
						this.plugin.settings['#spacing'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Stroke')
			.setDesc('#stroke directive')
			.addText(text => (
				text
					.setPlaceholder('#33322E')
					.setValue(this.plugin.settings['#stroke'])
					.onChange(async (value) => {
						this.plugin.settings['#stroke'] = value;
						await this.plugin.saveSettings();
					})
			));

		new Setting(containerEl)
			.setName('Ranker')
			.setDesc('#ranker directive')
			.addDropdown(dropdown => (
				dropdown
					.addOption('network-simplex', 'Network Simplex')
					.addOption('tight-tree', 'Tight Tree')
					.addOption('longest-path', 'Longest Path')
					.setValue(this.plugin.settings['#ranker'])
					.onChange(async (value) => {
						this.plugin.settings['#ranker'] = value;
						await this.plugin.saveSettings();
					})
			));

	}
}
