<?php  
    include_once './adminHeaderFooter/pageHeader.php' 
?>
<h1>Admin</h1>

    <?php
        include_once '../includes/dbh.inc.php';
        
        // $sql = "SELECT * FROM pages;";
        // $result = mysqli_query($conn, $sql);
        // $resultCheck = mysqli_num_rows($result);
        // if($resultCheck < 1) {
        //     // header("Location: ../index.php?login=error");
        //     exit();			
        // } else {
        //     for($i = 0; $i < $resultCheck; $i++) {
        //         if($row = mysqli_fetch_assoc($result)) {
        //             echo 
        //             '<div class="d-flex">
        //                 <p>'.$row['name'].' </p>
        //                 <select name="sections" id="section">
        //                     <option value="section">Section</option>
        //                 </select>
        //             </div>';   
        //         }
        //     }
        // }
        $arrayOfExistingPages = glob("../*.php");
        $existingPages = Array();
        for($i = 0; $i < sizeof($arrayOfExistingPages); $i++) {
            $existingPages[$i] = basename($arrayOfExistingPages[$i], ".php");
        }

        

        print_r($existingPages);

    ?>
    <br><br><br><br><br><br><br>
<?php  
    include_once './adminHeaderFooter/pageFooter.php' 
?>
