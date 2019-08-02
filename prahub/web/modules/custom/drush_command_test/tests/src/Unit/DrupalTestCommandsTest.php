<?php

namespace Drupal\Tests\drush_command_test\Unit;

use Drupal\Tests\UnitTestCase;
use Drush\TestTraits\DrushTestTrait;

/**
 * @coversDefaultClass \Drupal\drush_command_test\Commands\DrushCommandTestCommands
 * @group drush_command_test
 */
class DrupalTestCommandsTest extends UnitTestCase {

  use DrushTestTrait;

  /**
   * {@inheritdoc}
   */
  public static $modules = ['drush_command_test'];

  /**
   * Tests Drush commands with options and wrapper.
   */
  public function testDrushCommandOptionsWithWrapper() {
    $this->drush('dc:rww --option_1');
    $output = $this->getOutput();
    $this->assertContains("Option 1 selected", $output);
  }

  /**
   * Tests Drush commands without options and wrapper.
   */
  public function testDrushCommandNOptionsWithWrapper() {
    $this->drush('dc:rww');
    $output = $this->getOutput();
    $this->assertContains("No option selected", $output);
  }

  /**
   * Tests Drush commands with options and wrapper.
   */
  public function testDrushCommandOptions() {
    $this->drush('dc:tc --option_1');
    $output = $this->getOutput();
    $this->assertContains("Option 1 selected", $output);
  }

  /**
   * Tests Drush commands without options and wrapper.
   */
  public function testDrushCommandNOptions() {
    $this->drush('dc:tc');
    $output = $this->getOutput();
    $this->assertContains("No option selected", $output);
  }

  /**
   * Tests Drush commands without options and wrapper - Error.
   */
  public function testDrushCommandNOptionsError() {
    $this->drush('dc:tc');
    $output = $this->getOutput();
    $this->assertContains("No option selected", $output);
  }

}
