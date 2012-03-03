<?php

// This file is part of the Open iframe block for Moodle
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.


class block_openiframe extends block_base {
    function init() {
        $this->title = get_string('pluginname', 'block_openiframe');
    }

    function applicable_formats() {
        return array('all' => true);
    }

    function user_can_addto($page) {
        return true;
    }

    function get_content() {
        global $PAGE, $CFG, $OUTPUT, $COURSE;

        if ($this->content !== NULL) {
            return $this->content;
        }

        $this->content = new stdClass;
        $this->content->footer = null;
        $this->content->text = null;

        $jsmodule = array(
                          'name' => 'block_openiframe',
                          'fullpath' => new moodle_url('/blocks/openiframe/openiframe.js'),
                          'strings' => array(),
                          'requires' => array('node', 'event', 'panel')
                          );
        $vars = array('spinner' => $OUTPUT->pix_url('i/loading').'');
        $PAGE->requires->js_init_call('M.blocks_openiframe.init', array($vars), false, $jsmodule);

        return $this->content;
    }

}
