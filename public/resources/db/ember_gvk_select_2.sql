SELECT 
teams.index AS "Бригада",
COUNT(requests.task) AS "Количество заявок"
FROM public.requests 
JOIN public.teams ON requests.team=teams.id
GROUP BY teams.index
ORDER BY COUNT(requests.task) DESC;