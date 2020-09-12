<?php
include_once '../../includes/dbh.inc.php';
if(isset($_GET['pageToAdd'])) {
    $pageToAdd = $_GET['pageToAdd'];
    $sql = "INSERT INTO pages (name) VALUES ('". $pageToAdd ."');";
    $result = mysqli_query($conn, $sql);
    echo $result;
    if($result) {
        header("Location: ../index.php?pageAdded=success");
    } else {
        header("Location: ../index.php?pageAdded=error");        
    }   
    exit();			
}else if(isset($_GET['pageToCreate'])) {
    $pageToCreate = $_GET['pageToCreate'];
    // echo $pageToCreate;

    
    $file = "../../" . $pageToCreate . '.php';
    if(!is_file($file)){
        $contents = "<?php  require './includes/pageHeader.inc.php' ?>\n<?php require './includes/content.inc.php' ?>\n<?php require './includes/pageFooter.inc.php' ?>
        ";
        file_put_contents($file, $contents);
        header("Location: ../index.php?pageCreated=success");           
    }

    
}else if(isset($_GET['sectionToAdd'])) {
    $sectionToAdd = $_GET['sectionToAdd'];
    $sql = "INSERT INTO sections (name) VALUES ('". $sectionToAdd ."');";
    $result = mysqli_query($conn, $sql);
    echo $result;
    if($result) {
        header("Location: ../index.php?sectionAdded=success");
    } else {
        header("Location: ../index.php?sectionAdded=error");        
    }   
    exit();			
}else if(isset($_GET['sectionToCreate'])) {
    $sectionToCreate = $_GET['sectionToCreate'];
    
    $file = "../../sections/" . $sectionToCreate . '.php';
    if(!is_file($file)){
        $contents = "";
        file_put_contents($file, $contents);
        header("Location: ../index.php?sectionCreated=success");
    }
}