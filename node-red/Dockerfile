FROM nodered/node-red

# Copy your flow into Node-RED default location
COPY flow.json /data/flows.json

# Railway uses dynamic port, so respect PORT
ENV PORT=1880
EXPOSE 1880
