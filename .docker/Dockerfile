FROM phusion/baseimage:0.11

LABEL maintainer="m.vanderschee@tfe.nl"

CMD ["/sbin/my_init"]

ENV NPM_FORCE_REBUILD "false"
ENV NPM_DEV "true"
ENV NPM_GENERATE: "false"

# Set correct timezone for timestamp
ENV TZ=Europe/Amsterdam
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install node and core packages
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && curl -sl https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get update -q \
    && apt-get install -y libglu1-mesa libxi6 zip unzip git-core nodejs yarn --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Setup for npm scrips on bootup
RUN mkdir -p /etc/my_init.d
COPY bash.sh /etc/my_init.d/01_bash.sh
RUN chmod +x /etc/my_init.d/01_bash.sh

# Setup workdir
WORKDIR /var/www/app

# Expose content volume
VOLUME /var/www/app