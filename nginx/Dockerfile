# # Use the official Nginx image as a base
# FROM nginx:latest

# # Copy the Nginx configuration files into the container
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY default.conf /etc/nginx/conf.d/default.conf

# # Expose the port Nginx will listen on
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]


#Start with the official Nginx base image
# FROM nginx:alpine

# # Install build dependencies
# RUN apk add --no-cache --virtual .build-deps \
#     gcc \
#     libc-dev \
#     make \
#     wget \
#     libmaxminddb-dev \
#     && apk add --no-cache \
#     zlib-dev \
#     openssl-dev \
#     && wget https://github.com/leev/ngx_http_geoip2_module/archive/refs/heads/master.zip -O /tmp/geoip2_module.zip \
#     && unzip /tmp/geoip2_module.zip -d /tmp/ \
#     && wget http://nginx.org/download/nginx-1.25.0.tar.gz -O /tmp/nginx.tar.gz \
#     && tar -zxvf /tmp/nginx.tar.gz -C /tmp/ \
#     && cd /tmp/nginx-1.25.0 \
#     && ./configure --with-compat --add-dynamic-module=/tmp/ngx_http_geoip2_module-master \
#     --with-http_ssl_module \
#     --with-http_v2_module \
#     && make modules \
#     && cp /tmp/nginx-1.25.0/objs/ngx_http_geoip2_module.so /etc/nginx/modules/ \
#     && apk del .build-deps \
#     && rm -rf /tmp/*

# Stage 1: Build GeoIP2 Module
ARG NGINX_VERSION=1.27.4  # Set the NGINX version explicitly
ARG NGINX_FROM_IMAGE=nginx:${NGINX_VERSION}
FROM ${NGINX_FROM_IMAGE} as builder

ARG PKG_RELEASE=1~  # Adjust to match your distribution

SHELL ["/bin/bash", "-exo", "pipefail", "-c"]

# Install required build dependencies
RUN apt-get update \
    && apt-get install -y --no-install-suggests --no-install-recommends \
                patch make wget git devscripts debhelper dpkg-dev \
                quilt lsb-release build-essential libxml2-utils xsltproc \
                equivs git g++ libparse-recdescent-perl \
                libmaxminddb-dev

# Clone pkg-oss repository
RUN git clone -b ${NGINX_VERSION}-${PKG_RELEASE%%~*} https://github.com/nginx/pkg-oss/ \
    && cd pkg-oss \
    && mkdir /tmp/packages \
    && cd debian \
    && make rules-module-geoip2 BASE_VERSION=$NGINX_VERSION NGINX_VERSION=$NGINX_VERSION \
    && mk-build-deps --install --tool="apt-get -o Debug::pkgProblemResolver=yes --no-install-recommends --yes" debuild-module-geoip2/nginx-$NGINX_VERSION/debian/control \
    && make module-geoip2 BASE_VERSION=$NGINX_VERSION NGINX_VERSION=$NGINX_VERSION \
    && find ../../ -maxdepth 1 -mindepth 1 -type f -name "*.deb" -exec mv -v {} /tmp/packages/ \;

# Stage 2: Install GeoIP2 Module in Final Image
FROM ${NGINX_FROM_IMAGE}

COPY --from=builder /tmp/packages /tmp/packages

RUN apt-get update \
    && apt-get install --no-install-suggests --no-install-recommends -y /tmp/packages/nginx-module-geoip2_${NGINX_VERSION}*.deb \
    && rm -rf /var/lib/apt/lists/
# Copy the GeoLite2 database (GeoLite2-City.mmdb)
COPY geoip2/GeoLite2-City.mmdb /etc/nginx/geoip2/GeoLite2-City.mmdb


# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Set the working directory
WORKDIR /etc/nginx

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
