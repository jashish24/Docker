<?php

namespace Drupal\drush_command_test\Commands;

use Drupal\Core\Database\Database;
use Drush\Commands\DrushCommands;
#use Drupal\node\Entity\Node;
#use Drupal\drush_command_test\Utility\DrushCmdWrapperUtilities;
use Drupal\Core\Entity\Query\QueryFactory;

/**
 * A Drush commandfile.
 *
 * In addition to this file, you need a drush.services.yml
 * in root of your module, and a composer.json file that provides the name
 * of the services file to use.
 */
class DrushCommandTestCommands extends DrushCommands {

  protected $entityQuery;
  protected $entityTypeManager;

  /**
   * {@inheritdoc}
   */
  public function __construct(QueryFactory $entity_query, $entityTypeManager) {
    $this->entityQuery = $entity_query;
    $this->entityTypeManager = $entityTypeManager;
  }

  /**
   * Runs commands passed and display time used.
   *
   * @param string $run_command
   *   Drush Command to be executed.
   * @param array $options
   *   Optional options.
   *
   * @command dc-run-wrapper
   * @aliases dc:rww
   * @usage dc-run-wrapper
   */
  public function runWithWrapper($run_command = '', array $options = [
    'option_1' => FALSE,
    'option_2' => FALSE,
    'option_3' => FALSE,
    'group' => self::REQ,
  ]) {

    $run_command = ($run_command == '') ? 'drush dc:tc' : 'drush ' . $run_command;

    foreach ($options as $option => $value) {
      if ($value) {
        $run_command .= is_bool($value) ? " --{$option}" : " --{$option}={$value}";
      }
    }

    $start_time = time();
    $output = shell_exec($run_command . ' 2>&1');
    $elapsed_seconds = time() - $start_time;
    $output = trim($output);

    $this->output()->writeln("Command output is as below:");
    $this->output()->writeln("******************** BEGIN ********************");
    $this->output()->writeln($output);
    $this->output()->writeln("********************* END *********************");
    $this->output()->writeln("Command took {$elapsed_seconds} seconds to run.");
  }

  /**
   * Runs test command.
   *
   * @param array $options
   *   Optional options.
   *
   * @command dc-test-command
   * @aliases dc:tc
   * @usage dc-test-command
   */
  public function testCommand(array $options = [
    'option_1' => FALSE,
    'option_2' => FALSE,
    'option_3' => FALSE,
    'group' => self::REQ,
  ]) {

    if ($options['option_1']) {
      $this->output()->writeln("Option 1 selected.");
    }

    if ($options['option_2']) {
      $this->output()->writeln("Option 2 selected.");
    }

    if ($options['option_3']) {
      $this->output()->writeln("Option 3 selected.");
    }

    if ($options['group']) {
      $this->output()->writeln("Group value is: " . $options['group']);
    }

    if (!$options['option_1'] && !$options['option_2'] && !$options['option_3'] && !$options['group']) {
      $this->output()->writeln("No option selected.");
    }

  }

}
