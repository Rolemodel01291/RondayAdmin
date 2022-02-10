import RondayUtils from '../../@ronday/utils';

class ChecklistItemModel {
	constructor(data) {
		const item = data || {};

		this.id = item.id || RondayUtils.generateGUID();
		this.name = item.name || '';
		// this.checked = item.checked || false;
	}
}

export default ChecklistItemModel;
