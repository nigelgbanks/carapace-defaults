(function ($, Drupal) {
  // Adds required functionality to enable interaction for the collection page
  Drupal.behaviors.ajaxViewDemo = {
    attach: function (context, settings) {
      // Attach ajax action click event of each view column and only for compound objects
      $('.view-eva.view-members article.node--type-islandora-object .field-node--field-display-title a, .view-eva.view-members article.node--type-islandora-object .field-media--field-media-image a').once('attach-links').each(this.attachLink);
    },

    attachLink: function (idx, object) {

      // Get the NID
      let href = $(object).attr('href');
      let matches = /node\/(\d*)/.exec(href);
      let nid = matches[1];
      // Set new class

      let view_info = {
        view_name: 'members',
        view_display_id: 'embedded',
        view_args: nid,
        view_dom_id: 'members__embedded'
      };

      // Details of the ajax action.
      let ajax_settings = {
        submit: view_info,
        url: '/views/ajax',
        element: object,
        event: 'click'
      };
      let _ajax = Drupal.ajax(ajax_settings);
      if (idx == 0) {
        // Load details from first object
        _ajax.execute();
      }
    }
  };

  Drupal.behaviors.carapace_defaults = {
    attach: function (context, settings) {
      function unserialize(data) {
        data = data.split('&');
        var response = {};
        for (var k in data){
          var newData = data[k].split('=');
          response[newData[0]] = newData[1];
        }
        return response;
      }

      $('select[name="sort_order"]').once('carapace_defaults_actions').change(function () {
        // Grab ALL elements from the URL and re-use them with this one request
        let existing_parameters = unserialize(location.search.slice(1));
        let selected_option = 'select[name="sort_order"] option[value="' + $(this).val() + '"]';
        existing_parameters.sort_order = $(selected_option).data('sort_order');
        existing_parameters.sort_by = $(selected_option).data('sort_by');
        let paramData = $.param(existing_parameters);
        // Redirect to perform a new search, removing old URL query para meters
        location.href = window.location.href.split("?")[0]  + '?' + paramData;
      });
    }
  };
})(jQuery, Drupal);
