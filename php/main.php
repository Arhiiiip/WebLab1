<?php

function writeLogs($message)
{
    $logs = fopen('php.log', 'a+');
    fwrite($logs, date('d.m.y H:i:s') . ': ' . $message . "\n");
    fclose($logs);
}

function validation($x, $y, $r)
{
    if ($x > -3 && $x < 5 && $y > -3 && $y < 3 && $r < 5 && $r > 2) {
        return true;
    } else {
        return false;
    }
}

function hit($x, $y, $r)
{
    if ($x > 0) {
        if ($y >= 0) {
            return (($x * $x + $y * $y) <= ($r * $r));
        } else {
            return false;
        }
    } else {
        if ($y <= 0) {
            return $y >= -2 * $x - $r / 2;
        } else
            return (-$x <= $r) && ($y <= $r / 2);
    }
}

$start = microtime(true);
date_default_timezone_set('Europe/Moscow');
global $x;
global $y;
global $r;

if (isset($_POST['x_value']) && isset($_POST['y_value']) && isset($_POST['r_value'])) {
    $x = trim($_POST['x_value']);
    $y = trim($_POST['y_value']);
    $r = trim($_POST['r_value']);

    if (validation($x, $y, $r)) {
        writeLogs('variables are defined: x: ' . $x . ', y: ' . $y . ', r: ' . $r);

        $time = date('G:i:s', time());
        $match = '';
        if (hit($x, $y, $r)) {
            $match = "TRUE";
            writeLogs($match);
        } else {
            $match = "FALSE";
        }
        $duration = round((microtime(true) - $start) * 10000, 4);
        $data = "{\"x_value\" : {$x}, \"y_value\" : {$y}, \"r_value\" : {$r}, \"current_time\" : \"{$time}\", \"duration\" : {$duration}, \"result\" : \"{$match}\"}";
        writeLogs($data);

        header('content-type: application/json');

        echo $data;
        writeLogs("Data was sent to client.");
    } else {
        writeLogs("Validation wasn't passed.");
    }
}
?>