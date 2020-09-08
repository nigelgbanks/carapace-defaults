<?php

namespace Drupal\carapace_defaults\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'AjaxViewBlock' block.
 *
 * @Block(
 *  id = "ajax_view_block",
 *  admin_label = @Translation("Members AJAX Display"),
 *  category = @Translation("Carapace"),
 * )
 */
class AjaxViewBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $build = [];

    $build['ajax_view_block'] = [
      '#theme' => 'collection_ajax',
      '#attached' => ['library' => 'carapace_defaults/mystic_behaviors']
    ];

    return $build;
  }

}

