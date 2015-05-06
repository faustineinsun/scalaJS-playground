* [http://neo4j.com/docs/2.1/cypher-refcard/](http://neo4j.com/docs/2.1/cypher-refcard/)
    * Add nodes and edges 
* $ :POST /db/data/transaction/commit {"statements":[{"statement":"MATCH path = (n)-[r]->(m) RETURN path","resultDataContents":["graph"]}]}
    * Save in `allNodesEdges_raw.json`
* Click `Update Graph`
* in neo4jgraph.json
    * start -> source  $ %s/start/source/gc   
    * end -> target $ %s/end/target/gc  
