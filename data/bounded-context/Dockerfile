FROM neo4j:3.5.14

ENV NEO4J_PASSWD neo4j
ENV NEO4J_AUTH neo4j/${NEO4J_PASSWD}

COPY bounded-context.dump /var/lib/neo4j/import/

VOLUME /data

CMD sed -e 's/^#dbms.read_only=.*$/dbms.read_only=true/' -i /var/lib/neo4j/conf/neo4j.conf && \
    mkdir -p /var/lib/neo4j/data/databases/graph.db && \
    bin/neo4j-admin set-initial-password ${NEO4J_PASSWD} || true && \
    bin/neo4j-admin load --from=/var/lib/neo4j/import/bounded-context.dump --force && \
    bin/neo4j start && sleep 5 && \
    tail -f logs/neo4j.log
