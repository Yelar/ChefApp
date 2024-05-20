<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $recipe_id = $_GET['recipe_id'];

    $sql = "SELECT * FROM comments WHERE recipe_id = ? ORDER BY created_at DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$recipe_id]);
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($comments);
}
?>
