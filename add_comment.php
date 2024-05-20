<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recipe_id = $_POST['recipe_id'];
    $username = $_POST['username'];
    $comment = $_POST['comment'];

    $sql = "INSERT INTO comments (recipe_id, username, comment) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$recipe_id, $username, $comment]);

    echo json_encode(['status' => 'success']);
}
?>
