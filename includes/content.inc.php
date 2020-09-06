<?php    
    include_once './includes/dbh.inc.php';
    // get pageId from pages based on current fileName
    // $currentFileName = basename(__FILE__, ".php"); <-- returns content.php
    $currentFileName = basename($_SERVER["SCRIPT_FILENAME"], '.php'); // <- returns the file that included content.php
    $sql = "SELECT id FROM pages WHERE name='". $currentFileName ."'";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);
    if($resultCheck < 1) {
        echo 'page does not exist';
    } else {
        $row = mysqli_fetch_assoc($result);
        $pageId = $row['id'];
        // get all ordered pageIds that have the right pageId
        $sql = "SELECT sectionId FROM pagesections WHERE pageId='". $pageId ."' ORDER BY position ASC";
        $result = mysqli_query($conn, $sql);
        $resultCheck = mysqli_num_rows($result);        
        $orderedPageIds = Array();        
        if($resultCheck < 1) {
            echo 'page does not have sections';
        } else {
            for($i = 0; $i < $resultCheck; $i++) {
                if($row = mysqli_fetch_assoc($result)) {
                    // print_r($row);
                    $orderedPageIds[] = $row['sectionId'];
                }
            }
            // print_r($orderedPageIds);
            for ($i = 0; $i < sizeof($orderedPageIds); $i++) {
                $sectionId =  $orderedPageIds[$i];
                $sql = "SELECT name FROM sections WHERE id=". $orderedPageIds[$i] ."";
                $result = mysqli_query($conn, $sql);
                $resultCheck = mysqli_num_rows($result);
                if($resultCheck < 1) {
                    echo 'section does not exist';
                } else {
                    $row = mysqli_fetch_assoc($result);
                    $sectionName = $row['name'];
                    
                    include './sections/'. $sectionName .'.php';
                }
            }
        }
    }
   

?>