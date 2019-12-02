SELECT 
tasks.content AS "Задача",
tasks.plane_duration AS "Плановая длительность",
AVG(requests.real_duration) AS "Средняя реальная длительность"
FROM public.requests 
JOIN public.tasks ON requests.task=tasks.id
GROUP BY tasks.content, tasks.plane_duration;