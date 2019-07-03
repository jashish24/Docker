<?php

namespace Drupal\tweaks\Form;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;

/**
 * Our example form class
 */
class AjaxSubmitDemo extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'ajax_submit_demo';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['message'] = [
      '#type' => 'markup',
      '#markup' => '<div class="result_message"></div>'
    ];

    $form['number_1'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Number 1'),
    ];

    $form['number_2'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Number 2'),
    ];

    $form['actions'] = [
      '#type' => 'button',
      '#value' => $this->t('Add'),
      '#ajax' => [
        'callback' => '::setMessage',
      ],
    ];

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this -> t('Submit'),
      '#button_type' => 'primary',
      '#ajax' => [
        'callback' => '::submitForm',
      ],
    ];

    return $form;
  }

  /**
   * Custom form submit handler using AJAX
   */
  public function setMessage(array $form, FormStateInterface $form_state) {
    $response = new AjaxResponse();
    $response->addCommand(
    new HtmlCommand(
      '.result_message',
      '<div class="my_top_message">' . t('The results is @result', ['@result' => ($form_state->getValue('number_1') + $form_state->getValue('number_2'))]) . '</div>'),
    );
    return $response;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $response = new AjaxResponse();
    $response->addCommand(
    new HtmlCommand(
      '.result_message',
      '<div class="my_top_message">' . t('The results is @result', ['@result' => ($form_state->getValue('number_1') + $form_state->getValue('number_2') + 6)]) . '</div>'),
    );
    return $response;
    //drupal_set_message(t('Submitted :percent', [':percent' => 100]));
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $form_values = $form_state->getValues();
    $number_1 = $form_values['number_1'];
    $number_2 = $form_values['number_2'];

    if ($number_1 == '' || $number_1 <= 0) {
      $form_state->setErrorByName('number_1',t('Please input proper number'));
    }
  }

}
