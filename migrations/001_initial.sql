CREATE TYPE upload_status AS ENUM (
    'PENDING',
    'UPLOADING',
    'COMPLETED',
    'FAILED',
    'ABORTED'
);

CREATE TABLE uploads (
    id UUID PRIMARY KEY,
    filename TEXT NOT NULL,
    total_size BIGINT NOT NULL,
    chunk_size INTEGER NOT NULL,
    total_parts INTEGER NOT NULL,
    content_type VARCHAR(255),
    uploaded_size BIGINT NOT NULL DEFAULT 0,
    status upload_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE upload_parts (
    id UUID PRIMARY KEY,
    upload_id UUID NOT NULL,
    part_number INTEGER NOT NULL,
    part_size BIGINT NOT NULL,
    part_checksum VARCHAR(64),
    storage_path TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_upload
        FOREIGN KEY (upload_id)
        REFERENCES uploads(id)
        ON DELETE CASCADE,

    UNIQUE(upload_id, part_number)
);

CREATE TABLE files (
    id UUID PRIMARY KEY,
    upload_id UUID UNIQUE NOT NULL,
    filename TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    sha256 VARCHAR(64) NOT NULL,
    content_type VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_file_upload
        FOREIGN KEY (upload_id)
        REFERENCES uploads(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_upload_parts_upload_id
ON upload_parts(upload_id);

CREATE INDEX idx_uploads_status
ON uploads(status);