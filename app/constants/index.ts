export const PLACEHOLDER = {
  user_query:
    "Show me the top-performing products by revenue for each category including year-over-year growth",
  generated_query:
    "```sql\nSELECT \n    CategoryID,\n    ProductID,\n    Year,\n    Revenue,\n    LAG(Revenue, 1) OVER (PARTITION BY CategoryID, ProductID ORDER BY Year) AS PreviousYearRevenue,\n    (Revenue - LAG(Revenue, 1) OVER (PARTITION BY CategoryID, ProductID ORDER BY Year)) / LAG(Revenue, 1) OVER (PARTITION BY CategoryID, ProductID ORDER BY Year) * 100 AS YearOverYearGrowth\nFROM\n    Sales\nORDER BY\n    CategoryID,\n    Revenue DESC;\n```",
  homepageQuery: "Show me users who purchased more than $500 last month",
  homepageGenerated: `SELECT u.username, u.email, SUM(o.total) as total_spent
    FROM users u
    JOIN orders o ON u.id = o.user_id
    WHERE o.created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
    GROUP BY u.id
    HAVING total_spent > 500;`,
};
