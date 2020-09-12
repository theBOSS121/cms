<?php  
    include_once './includes/pageHeader.inc.php';
    include_once '../includes/dbh.inc.php';
?>
<h1>Admin</h1>

<?php
    //  check sync for pages in db and projects
    $sql = "SELECT * FROM pages;";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);
    $pagesFromDb = Array();
    if($resultCheck > 1) {
        for($i = 0; $i < $resultCheck; $i++) {
            if($row = mysqli_fetch_assoc($result)) {
                $pagesFromDb[$i] = $row['name'];
            }
        }
    }
    $arrayOfExistingPages = glob("../*.php");
    $existingPages = Array();
    for($i = 0; $i < sizeof($arrayOfExistingPages); $i++) {
        $existingPages[$i] = basename($arrayOfExistingPages[$i], ".php");
    }

    for($i = 0; $i < sizeof($existingPages); $i++) {
        $pageInDb = false;
        for($j = 0; $j < sizeof($pagesFromDb); $j++) {
            if($existingPages[$i] == $pagesFromDb[$j]) {
                $pageInDb = true;
            }
        }
        if(!$pageInDb) {
            echo "<p>Page: ". $existingPages[$i] ." is not in db</p>";
            echo "<a href='./includes/model.inc.php?pageToAdd=". $existingPages[$i] ."'>Add page to db</a>";
        }
    }

    for($j = 0; $j < sizeof($pagesFromDb); $j++) {
        $pageExist = false;
        for($i = 0; $i < sizeof($existingPages); $i++) {
            if($existingPages[$i] == $pagesFromDb[$j]) {
                $pageExist = true;
            }
        }
        if(!$pageExist) {
            echo "<p>Page: ". $pagesFromDb[$j] ." does not exist</p>";
            echo "<a href='./includes/model.inc.php?pageToCreate=". $pagesFromDb[$j] ."'>Create file ". $pagesFromDb[$j] .".php</a>";
        }
    }
    //  check sync for sections in db and projects    
    $sql = "SELECT * FROM sections;";
    $result = mysqli_query($conn, $sql);
    $resultCheck = mysqli_num_rows($result);
    $sectionsFromDb = Array();
    if($resultCheck > 1) {
        for($i = 0; $i < $resultCheck; $i++) {
            if($row = mysqli_fetch_assoc($result)) {
                $sectionsFromDb[$i] = $row['name'];
            }
        }
    }
    $arrayOfExistingSections = glob("../sections/*.php");
    $existingSections = Array();
    for($i = 0; $i < sizeof($arrayOfExistingSections); $i++) {
        $existingSections[$i] = basename($arrayOfExistingSections[$i], ".php");
    }

    for($i = 0; $i < sizeof($existingSections); $i++) {
        $sectionInDb = false;
        for($j = 0; $j < sizeof($sectionsFromDb); $j++) {
            if($existingSections[$i] == $sectionsFromDb[$j]) {
                $sectionInDb = true;
            }
        }
        if(!$sectionInDb) {
            echo "<p>Section: ". $existingSections[$i] ." is not in db</p>";
            echo "<a href='./includes/model.inc.php?sectionToAdd=". $existingSections[$i] ."'>Add section to db</a>";
        }
    }

    for($j = 0; $j < sizeof($sectionsFromDb); $j++) {
        $sectionExist = false;
        for($i = 0; $i < sizeof($existingSections); $i++) {
            if($existingSections[$i] == $sectionsFromDb[$j]) {
                $sectionExist = true;
            }
        }
        if(!$sectionExist) {
            echo "<p>Section: ". $sectionsFromDb[$j] ." does not exist</p>";
            echo "<a href='./includes/model.inc.php?sectionToCreate=". $sectionsFromDb[$j] ."'>Create file ". $sectionsFromDb[$j] .".php</a>";
        }
    }
?>

<div class="container tabs-container">
    <div class="tabs-nav d-flex justify-content-center align-items-center no-select">
        <div class="tabs-nav-item" data-tab-id="tab-1">Pages</div>
        <div class="tabs-nav-item" data-tab-id="tab-2">Sections</div>
        <div class="tabs-nav-item" data-tab-id="tab-3">PageSections</div>
    </div>
    <div class="tabs d-flex">
        <div class="tab" id="tab-1">
            <div class="tab-content">
                <h3>Pages</h3>
                <?php
                    print_r($pagesFromDb);
                ?>
            </div>
        </div>
        <div class="tab" id="tab-2">
            <div class="tab-content">
                <h3>Sections</h3>
                <?php
                    print_r($sectionsFromDb);
                ?>
            </div>
        </div>
        <div class="tab" id="tab-3">
            <div class="tab-content">
                <h3>PageSections</h3>                
                <?php                    
                    $sql = "SELECT * FROM pagesections;";
                    $result = mysqli_query($conn, $sql);
                    $resultCheck = mysqli_num_rows($result);
                    $pageSectionsFromDb = Array();
                    if($resultCheck > 1) {
                        for($i = 0; $i < $resultCheck; $i++) {
                            if($row = mysqli_fetch_assoc($result)) {
                                $pageSectionsFromDb[$i] = $row;
                            }
                        }
                    }
                    print_r($pageSectionsFromDb);
                ?>
            </div>
        </div>
    </div>
</div>
<br>

<?php  
    include_once './includes/pageFooter.inc.php' 
?>
