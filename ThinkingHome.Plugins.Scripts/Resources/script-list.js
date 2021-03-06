﻿define(
	['lib',
		'webapp/scripts/script-list-model',
		'webapp/scripts/script-list-view',
		'lang!webapp/scripts/lang.json'],
	function (lib, models, views, lang) {

		var scriptList = lib.common.AppSection.extend({
			start: function () {
				this.reload();
			},

			runScript: function (view) {
				var scriptId = view.model.get('id');

				models.runScript(scriptId).done(function () {
					var name = view.model.get('name');
					lib.utils.alert(lang.get('The_0_script_has_been_executed'), name);
				});
			},

			deleteScript: function (view) {
				var scriptName = view.model.get('name');

				if (lib.utils.confirm(lang.get('Delete_the_0_script'), scriptName)) {
					var scriptId = view.model.get('id');
					models.deleteScript(scriptId).done(this.bind('reload'));
				}
			},

			addScript: function () {
				this.application.navigate('webapp/scripts/script-editor');
			},

			editScript: function (view) {
				var scriptId = view.model.get('id');
				this.application.navigate('webapp/scripts/script-editor', scriptId);
			},

			displayList: function (items) {
				var view = new views.ScriptListView({ collection: items });

				this.listenTo(view, 'scripts:add', this.bind('addScript'));
				this.listenTo(view, 'childview:scripts:edit', this.bind('editScript'));
				this.listenTo(view, 'childview:scripts:run', this.bind('runScript'));
				this.listenTo(view, 'childview:scripts:delete', this.bind('deleteScript'));

				this.application.setContentView(view);
			},

			reload: function () {
				models.loadScriptList()
					.done(this.bind('displayList'));
			}
		});

		return scriptList;
	});