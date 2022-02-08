# Generated by Django 3.2.8 on 2022-02-08 16:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import main.model_tools
import main.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=150, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_staff', models.BooleanField(default=False)),
                ('credits', models.IntegerField(default=0)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', main.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('private', models.BooleanField(default=True)),
                ('picture', models.ImageField(blank=True, upload_to=main.model_tools.generate_filename_userpic)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserCollection',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('collection_name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=300)),
                ('dimension_x', models.IntegerField()),
                ('dimension_y', models.IntegerField()),
                ('collection_size', models.IntegerField(default=0)),
                ('path', models.CharField(max_length=250)),
                ('token_name', models.CharField(max_length=9)),
                ('image_name', models.CharField(max_length=10)),
                ('duplicates_deleted', models.BooleanField(default=False)),
                ('collection_ifps_bool', models.BooleanField(default=False)),
                ('image_uri', models.CharField(blank=True, max_length=100, null=True)),
                ('contract_address', models.CharField(blank=True, max_length=50, null=True)),
                ('contract_bool', models.BooleanField(default=False)),
                ('chain_id', models.CharField(blank=True, max_length=10, null=True)),
                ('contract_type', models.IntegerField(default=0)),
                ('base_uri', models.CharField(blank=True, max_length=100, null=True)),
                ('minting_cost', models.CharField(blank=True, max_length=50, null=True)),
                ('tokens_deployed', models.BooleanField(default=False)),
                ('public_mint', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserAsset',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('image', models.ImageField(blank=True, null=True, upload_to=main.model_tools.user_asset_location)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Token',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('hash', models.UUIDField(default=uuid.uuid4)),
                ('created', models.DateTimeField(auto_now_add=True, null=True)),
                ('type', models.CharField(choices=[('P', 'password reset token'), ('A', 'account verification token')], max_length=1, verbose_name='typ')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CollectionImage',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('path', models.TextField(blank=True, max_length=500, null=True)),
                ('path_compressed', models.TextField(blank=True, max_length=500, null=True)),
                ('metadata', models.TextField(blank=True, max_length=2048, null=True)),
                ('ipfs_metadata_path', models.URLField(blank=True, max_length=50, null=True)),
                ('ipfs_bool', models.BooleanField(default=False)),
                ('linked_collection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.usercollection')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
