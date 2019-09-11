<?php

namespace Drupal\tweaks\Plugin\views\query;

use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Plugin\views\query\QueryPluginBase;

/**
 * VAPN views query plugin which wraps calls to the VAPN API in order to
 * expose the results to views.
 *
 * @ViewsQuery(
 *   id = "tweaks_sql",
 *   title = @Translation("Tweaks Query"),
 *   help = @Translation("Query against the Tweaks API."),
 *   no_ui = FALSE
 * )
 */

class TweaksSql extends QueryPluginBase {

  /**
   * {@inheritdoc}
   */
  protected function defineOptions() {
    $options = parent::defineOptions();

    $options['use_vapn'] = [
      'default' => FALSE,
    ];

    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);

    $form['use_vapn'] = [
      '#title' => $this->t('Use VAPN'),
      '#description' => $this->t('Allow view to use VAPN permissions. This will remove rows which user does not have view access irrespective of filter.'),
      '#type' => 'checkbox',
      '#default_value' => !empty($this->options['use_vapn']),
      '#weight' => 0,
    ];
  }

  public function ensureTable($table, $relationship = NULL) {
    return '';
  }

  public function addField($table, $field, $alias = '', $params = array()) {
    return $field;
  }
}
