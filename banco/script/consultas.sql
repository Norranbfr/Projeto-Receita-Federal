
-- Pesquisa os dados de uma Empresa pré definidos --
SELECT e.cnpj, e.razao_social
FROM empresa e
WHERE e.cnpj = '64342828000100';
-------------------------------------------
--   historico De Cnpj ja pesquisados --
SELECT h.cnpj_pesquisado, e.razao_social
FROM historico_pesquisas h
JOIN empresa e ON e.cnpj = h.cnpj_pesquisado
WHERE h.usuario_id = 1
ORDER BY h.data_pesquisa DESC
LIMIT 4;
